import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalStrategy } from "../strategys/local.strategy";

@Injectable()
export class LocalGuard extends AuthGuard('local') {}