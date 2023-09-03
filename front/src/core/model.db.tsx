export interface image{
    id: number,
    name: string,
    tags: tag[],
    url: string,
    title:string
  }

export interface tag{
    id: number,
    name: string,
  }