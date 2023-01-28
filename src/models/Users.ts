class User {
    private name: string;
    private password: string;
    private email: string;
    private dateBirth: Date;
    private dateRegister: Date;
    private gender: string;
    private phoneNumber: string;
    private cpf: string;

    constructor(name: string, password: string, email: string, dateBirth: Date, dateRegister: Date, gender: string, phoneNumber: string, cpf: string) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.dateBirth = dateBirth;
        this.dateRegister = dateRegister;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.cpf = cpf;
    }

    public create(): void {
        // lógica para criar um usuário
    }

    public read(): void {
        // lógica para ler um usuário
    }

    public update(): void {
        // lógica para atualizar um usuário
    }

    public delete(): void {
        // lógica para excluir um usuário
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getDateBirth(): Date {
        return this.dateBirth;
    }

    public setDateBirth(dateBirth: Date): void {
        this.dateBirth = dateBirth;
    }

    public getDateRegister(): Date {
        return this.dateRegister;
    }

    public setDateRegister(dateRegister: Date): void {
        this.dateRegister = dateRegister;
    }

    public getGender(): string {
        return this.gender;
    }

    public setGender(gender: string): void {
        this.gender = gender;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }
}
