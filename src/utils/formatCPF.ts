function formatCPF(cpf: string) {
    return cpf.replace(/[^a-zA-Z0-9]+/g, "");
}

export default formatCPF;