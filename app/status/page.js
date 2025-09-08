import { sql } from '@vercel/postgres';

export default async function StatusPage() {
  try {
    // Test database connection
    const dbTest = await sql`SELECT 1 as status`;
    
    // Test environment variables
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      POSTGRES_URL: process.env.POSTGRES_URL ? "Set" : "Missing",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Set" : "Missing"
    };
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Application Status</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Connection</h2>
          <div className="flex items-center text-green-600">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Successful connection to database</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className={value === "Missing" ? "text-red-600" : "text-green-600"}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Visit the <a href="/join" className="text-blue-600 hover:underline">join page</a> to see your new design</li>
            <li>Create an account at <a href="/signup" className="text-blue-600 hover:underline">signup page</a></li>
            <li>Initialize your database with <code className="bg-gray-100 px-1 py-0.5 rounded">npm run db:init</code></li>
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Application Status</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Connection</h2>
          <div className="flex items-center text-red-600">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Database connection failed: {error.message}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Troubleshooting Tips</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Verify your database credentials in .env.local</li>
            <li>Ensure your Vercel Postgres instance is running</li>
            <li>Check network connectivity to your database</li>
            <li>Run <code className="bg-gray-100 px-1 py-0.5 rounded">npm run db:init</code> to initialize database tables</li>
          </ul>
        </div>
      </div>
    );
  }
}
