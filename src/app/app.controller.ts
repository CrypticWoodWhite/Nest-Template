import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) {}

    @Get()
    public root(@Res() res): void {
        res.sendFile('index.html');
    }
}
