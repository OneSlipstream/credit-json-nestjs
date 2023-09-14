import { HttpException, HttpStatus } from '@nestjs/common';

const CustomErrorReason = {
  // MARK: - Identity
  'identity.credentials.invalid': {
    message: 'The email or password you entered is incorrect.',
    code: HttpStatus.UNAUTHORIZED,
  },
  'identity.email.unverified':
    'The email address for this account has not been verified.',
  'identity.email.verified':
    'The email address for this account has already been verified.',
  'identity.email.exists':
    'This email address is already in use by another account.',
  'identity.mfa.exists': 'This account already has MFA enabled.',
  'identity.mfa.missing': 'This account does not have MFA enabled.',
  'identity.email.missing': 'There is no account associated with this email.',

  // MARK: - User
  'user.permission.rejected': {
    message: 'You do not have permission to perform this reqeuest.',
    code: HttpStatus.FORBIDDEN,
  },
  'user.platform.limit':
    'You have exceeded the maximum number of platforms you can own',

  // MARK: - Platform
  'platform.credentials.missing':
    'This platform does not have any credentials.',
  'platform.credentials.limit':
    'The platform has reached the credential limit.',
  'platform.role.exists': 'This user is already a member of this platform.',

  // MARK: - Platform Billing
  'billing.subscription.missing': {
    message: 'This platform has no plans enabled.',
    code: HttpStatus.BAD_REQUEST,
  },

  // MARK: - Platform KYB
  'platform_kyb.status.locked':
    'This platform KYB cannot be updated because it is locked.',

  // MARK: - External
  'external.stripe.error': {
    message: 'An error with our payment processor.',
    code: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  // MARK: - Sequence
  'sequence.push.failed': {
    message: 'An error occurred while processing your request.',
    code: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  // MARK: - Search
  'search.create.failed': {
    message: 'An error ocurred while performing the search.',
    code: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  'search.create.unsupported': {
    message: 'The requested bureau is not supported.',
    code: HttpStatus.NOT_IMPLEMENTED,
  },
  'search.create.overlap':
    'Too many possible bureau records correspond to the customer details given.',
  'search.create.unauthorised':
    'The credentials provided are invalid or have expired.',
  'search.create.blocked':
    'The request has been blocked, the IP address may not be whitelisted.',
  'search.parse.failed': 
    'An error occurred while parsing the search response.',

  // MARK: - Consumer
  'consumer.address.missing':
    'The consumer does not have any associated addresses.',
} as const;

export default class CustomDelegateError {
  static throw(reason: keyof typeof CustomErrorReason) {
    const error = CustomErrorReason[reason];
    const errorCode: HttpStatus =
      typeof error === 'string' ? HttpStatus.BAD_REQUEST : error.code;
    const errorMessage: string =
      typeof error === 'string' ? error : error.message;

    throw new HttpException({
      error: errorMessage,
      code: reason,
    }, errorCode);
  }
}
