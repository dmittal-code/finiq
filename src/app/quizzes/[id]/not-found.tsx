import Link from 'next/link';

export default function QuizNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-8xl mb-8">🔍</div>
        <h1 className="text-heading-1 font-bold text-gray-900 mb-4">
          Quiz Not Found
        </h1>
        <p className="text-body-large text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn't find the quiz you're looking for. It may have been removed or the URL might be incorrect.
        </p>
        
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8 text-left max-w-md mx-auto">
          <h3 className="text-heading-3 font-semibold text-gray-800 mb-4">Possible reasons:</h3>
          <ul className="space-y-2 text-body text-gray-600">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              The quiz ID in the URL is invalid
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              The quiz was removed or archived
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              You followed a broken link
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quizzes" className="btn-primary text-lg px-8 py-4">
            🎯 Browse All Quizzes
          </Link>
          <Link href="/" className="btn-secondary text-lg px-8 py-4">
            🏠 Go Home
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-body-small text-gray-500">
            Need help? Check out our{' '}
            <Link href="/quizzes" className="text-blue-600 hover:underline">
              complete quiz collection
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 