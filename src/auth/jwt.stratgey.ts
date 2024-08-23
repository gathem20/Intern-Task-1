import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prismaService } from "src/prisma/prisma.service";
import { signup } from "./dto/dto-signup";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userModel:Promise<signup>){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET
        });
    }
    async validate(payload:any){
        const {id} = payload
        // const user = await this.userModel.(id);
    }
}