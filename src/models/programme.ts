export class Programme {
    constructor(private name: string,
                private imgPath: string,
                private mood: string[]) {}

    getMood(): string[] {
        return this.mood;
    }

    getName(): string {
        return this.name;
    }

    getImgPath(): string {
        return this.imgPath;
    }
}
