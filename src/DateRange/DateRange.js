// @flow

export default class DateRange {
    start: Date

    end: Date

    constructor(start: Date, end: Date) {
        this.start = start
        this.end = end
    }

    toString(): string {
        return `${this.start.toLocaleDateString()} - ${this.end.toLocaleDateString()}`
    }
}
