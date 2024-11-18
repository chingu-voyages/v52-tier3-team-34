import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Eye, EyeClosed } from 'lucide-react';
import GoogleLogo from '../assets/google-icon.svg';

// Define the type for the user data
interface NewUserData {
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
  confirmPassword: string;
}

type NewUserSubmissionData = Omit<NewUserData, 'acceptPrivacy' | 'confirmPassword'>;

// Define form validation schema using zod
const registrationSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string().min(6, { message: 'Please confirm your password.' }),
    acceptPrivacy: z.boolean().refine((val) => val === true, {
      message: 'You must accept the privacy policy.'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.'
  });

// Component registration as route
export const Route = createFileRoute('/register')({
  component: RouteComponent
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptPrivacy: false
    }
  });

  // Use the mutation with the correct type
  // Use the mutation with the correct type
  const registerUser = useMutation<unknown, Error, NewUserSubmissionData>({
    mutationFn: (newUser) => {
      console.log('New user: ', newUser);
      // Replace this with actual registration logic, such as an API call
      return Promise.resolve(); // Assuming successful registration simulation
    },
    onSuccess: () => {
      // Reset the form after successful user creation
      reset();
    }
  });

  const onSubmit = (data: NewUserData) => {
    const { acceptPrivacy, confirmPassword, ...filteredData } = data; // Destructure to exclude acceptPrivacy
    registerUser.mutate(filteredData);
  };

  // State to toggle password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md my-3">
      <h3 className="text-2xl font-semibold text-center mb-6">Register</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name?.message && <p className="text-red-500 text-sm mt-1">{errors.name.message.toString()}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email?.message && <p className="text-red-500 text-sm mt-1">{errors.email.message.toString()}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4 text-gray-500 "
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message.toString()}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-4 text-gray-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message.toString()}</p>
          )}
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="flex items-start">
          <input
            id="acceptPrivacy"
            type="checkbox"
            {...register('acceptPrivacy')}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="acceptPrivacy" className="ml-2 text-sm text-gray-700">
            I accept the{' '}
            <span className="text-blue-600 underline cursor-pointer">
              {' '}
              <Link target="blank" to="/privacy-policy">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>
        {errors.acceptPrivacy?.message && (
          <p className="text-red-500 text-sm mt-1">{errors.acceptPrivacy.message.toString()}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={registerUser.isPending}
        >
          {registerUser.isPending ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Google Signup Button */}
        <button
          type="button"
          className="flex justify-center items-center w-full mt-2 px-4 py-2 bg-white text-black font-medium rounded-md shadow-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="mx-3">
            <img src={GoogleLogo} width="30px" alt="google logo" />
          </span>
          <span>Sign Up with Google</span>
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>{' '}
          instead
        </p>
      </form>
    </div>
  );
}
