
//downlaod directly from browser
export function downloadJson(submission) {
    const json = JSON.stringify(submission, null, 2)

    const blob = new Blob([json], {
        type: "application/json"
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "sleep-diary-entry.json"
    link.click()

    URL.revokeObjectURL(url)
}


//post to URL - replace placeholder
async function sendJson(submission) {

    await fetch("placeholder", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(submission, null, 2)
    })
}