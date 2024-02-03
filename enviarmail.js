function sendMail() {
    var params = {
        email: document.getElementById('email').value,
        presupuesto: document.getElementById('presupuesto').value,
        startdate: document.getElementById('start-date').value,
        enddate: document.getElementById('end-date').value
    };

    const SERVICE_ID = "service_ud19ift";
    const TEMPLATE_ID = "template_08yw6rr"

    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
}

