function ButtonLogin({ onClick, loading }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full bg-primary text-white hover:bg-gray-400 font-bold py-3 px-4 rounded-lg transition duration-200"
        >
            {loading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </span>
            ) : "LOGIN"}
        </button>
    );
}

export default ButtonLogin;