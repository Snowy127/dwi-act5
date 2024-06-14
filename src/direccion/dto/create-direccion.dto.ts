export class CreateDireccionDto {
    clienteId: number
    localidadId: number
    calle: string
    numeroExterior: string
    numeroInterior?: string
    cp: string
}
