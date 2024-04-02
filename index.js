<!-- views/donate.ejs -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donate</title>
</head>
<body>
    <h1>Donate Money</h1>
    <form method="POST" id="paymentForm">
        <div>
            <label for="mobile">Mobile Number:</label>
            <input type="text" id="mobile" name="mobile" required>
        </div>
        <div>
            <label for="orgname">Organization Name:</label>
            <input type="text" id="orgname" name="orgname" required>
        </div>
        <div>
            <label for="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required>
        </div>
        <button type="submit">Donate</button>
    </form>

    <script>
        document.getElementById('paymentForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            const formData = new FormData(this);
            fetch('/initiate-payment', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Redirect to UPI payment app with generated UPI link
                window.location.href = data.upiLink;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while processing your donation. Please try again later.');
            });
        });
    </script>
</body>
</html>
