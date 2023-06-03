
type CredentialInput = {
    label:string,
    type:string,
    placeholder:string
}



export type Credentials = {
    name:string,
    credentials:{
        email:CredentialInput
        password:CredentialInput 
        username:CredentialInput 
    }
}