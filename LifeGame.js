class LifeGame {
    constructor (rows, columns) {
        this.rows = rows
        this.columns = columns
        this.generationNumber = 0
// заповнення матриці пустими елементами(false)
        this.map = [] // карта
        for (let y = 0; y < this.rows; y++) {
            const row = []

            for (let x = 0; x < this.columns; x++) {
                row.push(false)
            }

            this.map.push(row)
        }
    }

    changeGeneration () {
        const map = []

        for (let y = 0; y < this.rows; y++) {
            const row = []
            
            for (let x = 0; x < this.columns; x++) {
                let neighborsNumber = 0
                let state = false
                
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        // сама наша точка
                        if (dx === 0 && dy === 0) {
                            continue
                        }
                        
                        neighborsNumber += this.getField(x + dx, y + dy)
                    }
                }
                // перевірка на стан
                if (this.getField(x, y) === true) {
                    if (neighborsNumber === 2 || neighborsNumber === 3) {
                        state = true
                    }
                }

                else {
                    if (neighborsNumber === 3) {
                        state = true
                    }
                }

                row.push(state)
            }

            map.push(row)
        }
        //оновлюю стан
        this.map = map
        this.generationNumber++
    }

    // функцяя оживлює рандомні клітини
    reviveRandomFields (n = 1) {
        //клітини без життя
        const freeFields = []

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.getField(x, y) === false) {
                    freeFields.push({ x, y })
                }
            }
        }

        n = parseInt(n)
        n = Math.min(n, freeFields.length) // для уникання безкінечної кількості ітерацій

        while (n-- > 0) {
            // беру випадкову клітину і оживляю
            const index = Math.floor(Math.random() * freeFields.length)
            //const fieldv = freeFields.splice(index, 1)[0]
            //this.setField(field.x, field.y, true)
            const { x, y } = freeFields.splice(index, 1)[0]
            this.setField(x, y, true)
        }
    }
    //функція вищого порядка для кожного живого елемента
    forFreeEach (hander) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.getField(x, y) === true) {
                    hander(x, y)
                }
            }
        }
    }

    getField (x, y) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return false
        }

        return this.map[y][x]
    }

    setField (x, y, value) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return value
        }

        return this.map[y][x] = value
    }
}