import { EmailTemplate } from "@/components/email-template";
import prisma from "@/db";
import { Alert, Automation } from "@prisma/client";

import { Resend } from 'resend';

// dotconfig .env.local
import dotenv from 'dotenv'
import { Client } from "@elastic/elasticsearch";
dotenv.config({
    path: '.env.local'
})

console.log(process.env.RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY);
const client = new Client({
    node: "https://szmnk8f0-9200.uks1.devtunnels.ms/",
});





function getAlertsToRun(alerts: Automation[]) {
    return alerts.filter(alert => {
        const minuteNow = new Date().getMinutes()
        const cron = alert.cron.split(' ')
        const minute = cron[0]
        if (minute === '*') {
            return true
        }
        return minuteNow === parseInt(minute)
    })
}


async function runAutomation(automation: Automation) {
    const query = {
        size: 100,
        query: {
            bool: {
                must: [
                    {
                        term: {
                            "id.keyword": automation.service,
                        },
                    },
                    {
                        term: {
                            "logLevel.keyword": automation.trigger,
                        },
                    },
                ],
            },
        },
    }

    const resp = await client.search({
        index: "log*",
        body: query,
    })

    console.log(automation)
    console.log(resp)

    if (resp.hits.hits.length > 0) {
        return true
    }

    return false

}

async function main() {
    // check every minute for new alerts
    // store alerts 

    await prisma.alert.deleteMany()
    const automations: Automation[] = []
    setInterval(async () => {
        const newAutomations = await prisma.automation.findMany()
        for (const automation of newAutomations) {
            if (!automations.find(a => a.id === automation.id)) {
                automations.push(automation)
                console.log(automations)
            }
        }
        console.log('Checking for new automations')
    }, 5000)

    console.log('Worker started')

    setInterval(async () => {
        console.log('Checking for automations to run')
        console.log(`There are ${automations.length} alerts`)
        const automationsToRun = getAlertsToRun(automations)

        for (const automation of automationsToRun) {
            console.log('Running automation', automation)

            const sendEmail = await runAutomation(automation)

            console.log('Should send email', sendEmail)
            if (sendEmail) {
                console.log('Sending email')
                // ok lets send emial because conditonn is true 
                // ok lets send emial because conditonn is true 
                const record = await prisma.alert.create({
                    data: {
                        email: automation.email,
                        service: automation.service,
                        severity: automation.severity,
                        createdAt: new Date(),
                        title: automation.title,
                    }
                })
                const { data, error } = await resend.emails.send({
                    from: 'Durhack <no-reply@durhack24.nkdem.net>',
                    to: [`${automation.email}`],
                    subject: `${automation.severity} alert: ${automation.title}`,
                    react: EmailTemplate(record)
                });


                if (error) {
                    console.error(error);
                }
                console.log(data);
            }
        }
    }, 5000)


}


main().finally(async () => {
    await prisma.$disconnect()
}) 