import { Injectable } from "@angular/core"

@Injectable({
    providedIn :'root'
})
export class User {
    userName: string =''
    password: string = ''
    fName: string = ''
    lName: string = ''
    email: string = ''
    pNum: string = ''
    constructor()
    {

    }
}