import { useState } from "react";

export default function UpdateGoldPrice(){
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');

    // Function to handle the form submission and send the POST request
    const handleSubmit = async (event)=>{
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get the current UTC timestamp
        const timestamp = new Date().toISOString();  // UTC time in ISO format

        const goldPriceData = {
            price: parseFloat(price), // Convert to number
            timestamp: timestamp, // Use current UTC time
        };

        try {
            const response = await fetch('http://localhost:5158/api/GoldPrice/update-gold-price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(goldPriceData),
            });
            const responseData = await response.text();
            if (response.ok) {
                console.log(responseData);
                setStatus(responseData);
            } else {
                setStatus('Failed to update gold price');
            }
        } catch (error) {
            setStatus('Error: ' + error.message);
        }

    };

    return(
        <div className="container mt-4">
            <h2 className="text-center mb-3">Update Product Price</h2>
            <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3" htmlFor="price" style={{ width: '120px' }}>
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="form-control form-control-sm"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-sm">
                    Update Price
                </button>
            </form>

            {status && <p className="mt-3 text-center">{status}</p>}
        </div>

    );
}