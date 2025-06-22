import { Word } from './Word.js'; // Only if you're using the separate class

export class WordList {
    constructor() {
        this.words = [];
    }

    async populateFromCSV(csvUrl) {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to load CSV");

        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        const [headerLine, ...dataLines] = lines;
        for (const line of dataLines) {
            const [idStr, value] = line.split(',');
            const id = parseInt(idStr, 10);
            this.words.push(new Word(id, value.trim()));
        }
    }

    getElem(index) {
        return this.words[index]?.value || "";
    }
}