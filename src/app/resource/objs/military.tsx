

export class Military {
    private cnt: number[];
    private dmg: number[];
    private hit: number[];
    private type: string[];

    private state: number; // 2 bits representing recruit and camp

    public constructor () {
        this.cnt = [0, 0, 0];
        this.dmg = [20, 50, 5];
        this.hit = [50, 20, 300];
        this.type = ["Barbarian", "Archer", "Giant"];
        this.state = 0;
    }

    public buy(steve: string, more: number) : boolean {
        if (this.getTotalCnt() + more > 1000) {
            return false;
        }
        for (let i = 0; i < 3; i++) {
            if (steve === this.type[i]) {
                this.cnt[i] = this.cnt[i] + more;
                break;
            }
        }
        return true;
    }

    public getTotalCnt() : number {
        return this.cnt[0] + this.cnt[1] + this.cnt[2];
    }

    public getTotalHit(): number {
        return this.hit[0] + this.hit[1] + this.hit[2];
    }

    public getTotalDmg(): number {
        return this.dmg[0] + this.dmg[1] + this.dmg[2];
    }

    public aftermath(dmg: number): number[] {
        let loss : number[] = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            loss[i] = this.cnt[i] * dmg / this.getTotalHit();
            loss[i] = Math.floor(loss[i]);
            this.cnt[i] -= loss[i];
        }
        return loss;
    }

    public update(newState: number) : boolean {
        if ((newState & this.state) > 0) return false;
        this.state = this.state | newState;
        return true;
    }

    public checkBuilt(askedState: number) : boolean {
        return (this.state & askedState) > 0;
    }

    public getCamp(): boolean {
        return (this.state & 2) > 0;
    }

    public getRecruit(): boolean {
        return (this.state & 1) > 0;
    }
}