export type datachat = {
    inde: number,
    userchat: string,
    botchat: string,
    own:string,
}
export type dicchat = {
    inde: number,
    userchat: string,
    botchat:  sentences[]
}
export type sentences = {
    _id: string,
    fields: {
        en: string,
        vi: string
    }
}
export type dataTraCau = {
    value: any
    language: string,
    sentences: sentences[];
    suggestions:any[],
    tratu: any[];
} 
export type transcripts = [
    {
        _id:string,
        fields : {
            duration:string,
            en: string,
            start:string,
            youtube_id:string
        }
    }
]
export type transcriptss = {
    transcripts : transcripts
}
export type vocabulary = {
    Wordid : number,
    Word : string,
    mean :string
}
export type favourite = {
    own : number,
    wordID :number
}
export type login = {
    Username: string,
    Password:string
}