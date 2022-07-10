// NextJS & React imports
import Link from 'next/link';

// Third Party imports

// Domestic imports


const ForgotPass = () => {
  return (
    <div>
      <div className="flex justify-between my-5">
        <div className="flex items-center">
          <input
            id="signin-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
          />
          <label
            htmlFor="signin-checkbox"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Keep logged in
          </label>
        </div>
        <button className="text-red-500">
          <Link href="/help/forgot-password">
            <a>Forgot password</a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ForgotPass;
