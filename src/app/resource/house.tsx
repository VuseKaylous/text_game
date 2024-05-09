import { Money } from './objs/money';
import { Military } from './objs/military';

export class House {
    private storage: Money[];
    private storageType: string[];

    private military: Military;
    private townHall: number;

    public constructor() {
        this.storageType = ["Goldmine", "ElixirDistill", "GoldStorage", "ElixirStorage", "Barrack", "Camp"]
        this.storage = [new Money(), new Money()]
        this.storage[0].updateLevel();
        this.storage[1].updateLevel();
        this.storage[0].updateLevelCap();
        this.storage[0].updateLevelFarm();

        this.military = new Military();
        this.townHall = 1;
    }

    public getMilitary(): Military { return this.military; }

    public getGold(): Money { return this.storage[0]; }

    public getElixir(): Money { return this.storage[1]; }

    public updateLevel(): void {
        this.storage[0].updateLevel();
        this.storage[1].updateLevel();
        this.townHall++;
    }

    public getInfo(): string[] {
        let rt: string[] = ["Townhall level " + this.townHall];
        for (let i = 0; i < 6; i++) {
            if (i < 4) {
                if (i < 2) {
                    if (this.storage[i % 2].getLevelFarm() > 0)
                        rt.push(this.storageType[i] + " level " + this.storage[i % 2].getLevel());
                } else {
                    if (this.storage[i % 2].getLevelCap() > 0)
                        rt.push(this.storageType[i] + " level " + this.storage[i % 2].getLevel() + "\n");
                }
                
            } else {
                if (this.military.checkBuilt(i - 4))
                    rt.push(this.storageType[i] + " level 1\n");
            }
        }
        return rt;
    }

    public updateSecond() {
        this.storage[0].updateSecond();
        this.storage[1].updateSecond();
    }

    private findType(type: string): number {
        for (let i = 0; i < 6; i++) {
            if (type === this.storageType[i]) return i;
        }
        return -1;
    }

    public updateStorage(askedType: string): string | null {
        let type = this.findType(askedType);
        if (type == -1) return "Wrong object name";
        if (type < 4) {
            let tryUpdate: boolean = true;
            if (type < 2) tryUpdate = this.storage[type % 2].updateLevelFarm();
            else tryUpdate = this.storage[type % 2].updateLevelCap();
            
            if (!tryUpdate)
                return this.storageType[type] + " is already at max level.";
            // this.storage[type % 2].updateLevel();
            return null;
        }
        if (this.townHall < 3) return "You need to upgrade Townhall to level 3 to unlock military.";
        let tryUpdate : boolean = this.military.update(type - 4);
        if (!tryUpdate) return "You have already built a " + this.storageType[type];
        return null;
    }

    public checkBuilt(askedType: string): string | null {
        let type = this.findType(askedType);
        if (type == -1) return "Wrong object name";
        if (type >= 4) {
            let check : boolean = this.military.checkBuilt(type - 4);
            if (check) return "The " + this.storageType[type] + " has been built";
            return null;
        }
        let check: boolean = true;
        console.log(type)
        if (type < 2) check = (this.storage[type % 2].getLevelFarm() > 0);
        else check = (this.storage[type % 2].getLevelCap() > 0);
        if (check) return "The " + this.storageType[type] + " has been built";
        else return null;
    }
}