import { PassportStrategy } from "@nestjs/passport";
import { AuthService, jwtConstants } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret 
    });
  }

  async validate(payload) {
    return { user_id : payload.sub, username: payload.username };
  }
}