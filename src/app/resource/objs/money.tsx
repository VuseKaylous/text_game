

export class Money {
    private cap : number;
    private have : number;
    private levelCap : number;
    private levelFarm : number;
    private level: number;

    public constructor() {
        this.cap = 0;
        this.have = 0;
        this.levelCap = 0;
        this.levelFarm = 0;
        this.level = 0;
    }

    public getHave(): number {
        return this.have;
    }

    public getDisplay(): string {
        return this.have.toString() + "/" + this.cap.toString()
    }

    public getLevelCap(): number { return this.levelCap; }

    public getLevelFarm(): number { return this.levelFarm; }

    public getLevel(): number { return this.level; }

    public updateLevel(): void { this.level++; }

    public updateLevelCap(): boolean {
        if (this.level == this.levelCap) return false;
        this.levelCap = this.levelCap + 1;
        this.cap = this.cap + 1000;
        return true;
    }

    public updateLevelFarm(): boolean {
        if (this.level == this.levelFarm) return false;
        this.levelFarm++;
        return true;
    }

    public updateSecond(): void {
        this.have = this.have + Math.min(this.levelFarm * 10, this.cap - this.have); 
    }

    public useHave(amount: number): boolean {
        if (amount > this.have) {
            return false;
        }
        this.have = this.have - amount;
        return true;
    }
}
