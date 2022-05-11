const fs=require('fs')
const fileName='./datajson/goods.json'

fs.readFile(fileName,'utf8',(err,data)=>{
  let newData=JSON.parse(data)
  let i=0
  let pushData=[]
  newData.RECORDS.map((value,index)=>{
    if(value.IMAGE1!=null){
      i++
      console.log(value.NAME)
      pushData.push(value)

        }
  })
  console.log(i)
  // console.log(pushData)

  fs.writeFile('./datajson/newgoods.json',JSON.stringify(pushData),(err)=>{
    if(err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})