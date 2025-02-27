import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-2">Your order has been placed successfully.</p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
