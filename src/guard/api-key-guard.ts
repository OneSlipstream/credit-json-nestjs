import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { API_AUTH_KEY } from "src/lib/config";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();

    const apiKeyHeader = request?.headers?.['x-api-key']

    return apiKeyHeader ? apiKeyHeader === API_AUTH_KEY : false;
  }
}
