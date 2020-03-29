export class Session{
    public sessionId : string;
    public sessionCode : string;
    public keys : Array<Keys>;

    constructor(obj : string) {
        var o = JSON.parse(obj);

        this.sessionCode = o.sessionCode;
        this.sessionId = o.sessionId;
        this.keys = o.keys;
    }
}

export class Keys{
    public kty : string;
    public e : string;
    public use : string;
    public kid : string;
    public alg : string;
    public n : string;
}
