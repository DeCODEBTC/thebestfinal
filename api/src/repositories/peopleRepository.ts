import { AppDataSource } from '../data-source'
import { People } from '../entities/People'

export const peopleRepository = AppDataSource.getRepository(People)