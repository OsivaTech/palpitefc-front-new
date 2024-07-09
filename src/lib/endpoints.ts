import { env } from '@/env'

const apiBaseUrl = env.NEXT_PUBLIC_API_BASE_URL

export const LoginEndpoint = `${apiBaseUrl}/api/signin`
export const SelfEndpoint = `${apiBaseUrl}/users/me`
export const UpdateUser = `${apiBaseUrl}/users`
export const FixturesEndpoint = `${apiBaseUrl}/fixtures`
export const GuessEndpoint = `${apiBaseUrl}/guesses`
export const MyGuessEndpoint = `${apiBaseUrl}/guesses/me`
export const MyPointsEndpoint = `${apiBaseUrl}/points/me`
export const LeaguesEndpoint = `${apiBaseUrl}/leagues`
export const NewsEndpoint = `${apiBaseUrl}/news`
export const TeamsEndpoint = `${apiBaseUrl}/teams`
export const RegisterEndpoint = `${apiBaseUrl}/signup`
export const RankingsEndpoint = `${apiBaseUrl}/rankings`
export const PoolsEndpoint = `${apiBaseUrl}/polls`
export const VoteEndpoint = (pollI: number, optionId: string) =>
  `${apiBaseUrl}/polls/${pollI}/vote/${optionId}`
export const AdvertisamentEndpoint = `${apiBaseUrl}/advertisement`
export const SendForgotPasswordEmail = `${apiBaseUrl}/send-mail-code`
export const VerifyResetCode = `${apiBaseUrl}/verify-reset-code`
export const ResetPassword = `${apiBaseUrl}/reset-password`
