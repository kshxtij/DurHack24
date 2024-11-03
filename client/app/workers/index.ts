import { EmailTemplate } from "@/components/email-template";
import prisma from "@/db";
import { Alert } from "@prisma/client";

import { Resend } from 'resend';

// dotconfig .env.local
import dotenv from 'dotenv'
dotenv.config({
    path: '.env.local'
})

console.log(process.env.RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY);





function getAlertsToRun(alerts: Alert[]) {
    return alerts.filter(alert => {
        const minuteNow = new Date().getMinutes()
        const cron = alert.cron.split(' ')
        const minute = cron[0]
        return minuteNow === parseInt(minute)
    })
}

async function main() {
    // check every minute for new alerts
    // store alerts 

    await prisma.alert.deleteMany()
    const alerts: Alert[] = []
    setInterval(async () => {
        const newAlerts = await prisma.alert.findMany()
        for (const alert of newAlerts) {
            if (!alerts.find(a => a.id === alert.id)) {
                alerts.push(alert)
                console.log(alert)
            }
        }
        console.log('Checking for new alerts')
    }, 5000)

    console.log('Worker started')

    setInterval(async () => {
        console.log('Checking for alerts to run')
        console.log(`There are ${alerts.length} alerts`)
        const alertsToRun = getAlertsToRun(alerts)

        for (const alert of alertsToRun) {
            console.log('Running alert', alert)

            // ok lets send emial because conditonn is true 
        const { data, error } = await resend.emails.send({
            from: 'Durhack <no-reply@durhack24.nkdem.net>',
            to: ['nikodemb@pm.me'],
            subject: `${alert.severity} alert: ${alert.appName}`,
            react: EmailTemplate({ firstName: 'John' }),
          });

          if (error) {
            console.error(error);
          }
            console.log(data);
        }
    }, 5000)


}


main().finally(async () => {
    await prisma.$disconnect()
}) 