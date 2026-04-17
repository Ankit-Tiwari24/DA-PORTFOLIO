async function testMail() {
    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Antigravity Bot",
                email: "test@example.com",
                message: "Hello, this is a test message to verify the contact form setup works perfectly!"
            })
        });
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Success:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}

testMail();
