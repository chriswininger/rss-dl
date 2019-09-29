const axios = require('axios')
const fs = require('fs')
const Url = require('url')
const Path = require('path')
const RssParser = require('rss-parser')
const parser = new RssParser()

const feedUrl = process.argv[2]
const outputDir = process.argv[3]

if (feedUrl == null) {
  console.error('please provide a url to the feed')
  process.exit(1)
}

if (outputDir == null) {
  console.error('please provide an output directory')
  process.exit(1)
}

(async () => {
  const feed = await parser.parseURL(feedUrl)
  const totalItems = feed.items.length
  let cnt = 0
  let errorCnt = 0

  console.log(`Processing ${feed.title} with ${totalItems} items`)

  for (cnt; cnt < totalItems; cnt++) {
    const item = feed.items[cnt]
    const title = item.title
    const url = item.enclosure.url
    const fileName = getFileName(url)
    const fileFullPath = Path.resolve(outputDir, fileName)

    console.log(`archiving ${title}(${url})`)

    // we could make these downloads parallel but let's not spam jb
    try {
      console.log(`downloading ${title} from ${url}`)

      await downloadFile(url, fileFullPath)

      console.log(`download complete ${title}`)

      cnt++
    }
    catch (ex) {
      console.warn(`error downloading ${item.link}: "${ex}"`)
      errorCnt++
    }
  }

  console.log(`finished processing -- persisted ${cnt - 1}/${totalItems} items from feed`)

  if (errorCnt > 0) {
    console.warn(`finished with ${errorCnt} errors. See above for details`)
  }
})()

function getFileName(url) {
  const path = Url.parse(url).path

  return Path.parse(path).base
}

function downloadFile(url, fileFullPath) {
  return new Promise(async (resolve, reject) => {
    const file = fs.createWriteStream(fileFullPath)
    let resp

    try {
      resp = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      })
    } catch(ex) {
      return reject(ex)
    }

    resp.data.pipe(file)

    file.on('finish', resolve)
    file.on('error', reject)
  })
}
