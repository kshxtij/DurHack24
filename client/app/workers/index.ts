import prisma from "@/db";
import { Alert } from "@prisma/client";




function getAlertsToRun(alerts: Alert[]) {
    return alerts.filter(alert => {
        const minuteNow = new Date().getMinutes()
        const cron = alert.cron.split(' ')
        const minute = cron[0]
        return minuteNow === parseInt(minute)
    })
}

async function main() {
    console.log(await prisma.alert.findMany())
    // check every minute for new alerts
    // store alerts 
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
        }
    }, 1000)


}


main().finally(async () => {
    await prisma.$disconnect()
}) 