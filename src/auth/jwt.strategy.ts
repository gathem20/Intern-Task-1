import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prismaService } from "src/prisma/prisma.service";
import { signupDto } from "./dto/dto-signup";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private prisma:prismaService, config:ConfigService){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET
        });
    }
    async validate(payload:{email:string , sub:number}){
        const user = await this.prisma.findUnique({
            where:{
                id:payload.sub
            }
        })
        return user
    }
}