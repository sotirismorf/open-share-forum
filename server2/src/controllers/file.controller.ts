import { Request, Response } from 'express'
import { AppDataSource } from '../AppDataSource'
import { File } from '../entities/File'

export async function getFile(_request: Response, response: Response) {
  const data = await AppDataSource.getRepository(File).find()
  response.send(data)
}

export async function getFiles(request: Request, response: Response) {
  console.log(request.query)
  AppDataSource.getRepository(File)
    .find({
      relations: {
        course: true
      },
      where: request.query,
    })
    .then((data) => {
      response.send(data)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(400)
    })
}

export async function downloadFile(request: Request, response: Response) {
  AppDataSource.getRepository(File)
    .find({
      where: request.query,
    })
    .then((data) => {
      const file = `/home/sotiris/thmmyrepository/${data[0].id}`
      response.download(file, `${data[0].filebasename}.${data[0].extension}`)
    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(400)
    })
}


export async function newFile(request: Request, response: Response) {
  const repository = AppDataSource.getRepository(File)
  console.log(request.body)

  try {
    const metadata = repository.create(JSON.parse(request.body.document))
    console.log(metadata)

    const item = metadata[0]

    if (!request.files) {
      throw 'Missing file'
    }

    if (
      item.exams === undefined ||
      item.course === undefined ||
      item.semester === undefined ||
      item.exams === undefined ||
      item.exam_year === undefined ||
      item.filename === undefined ||
      item.has_solutions === undefined
    ) { throw 'Missing Property'}

    const filename = item.filename.split('.')

    item.filebasename = filename[0]
    item.extension = filename[1]

    repository.save(metadata).then((metadataSaved) => {
      const file: any = request.files.file
      file.mv(`/home/sotiris/thmmyrepository/${metadataSaved[0].id}`)
      response.send(metadataSaved[0])
    })
  } catch (err) {
    console.log(err)
    response.sendStatus(400)
  }
}
