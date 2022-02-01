import React from "react"
import { Layout, SEO, Container, Highlight, Heading, List } from "src/sws-ui"
import "src/css/pages/_privacy-conditions.scss"
import "src/css/pages/_news.scss"
import group12 from "src/images/icons/Group12.png"
import group121 from "src/images/icons/Group121.png"

const AboutUsPage = ({pageContext}) => {
  return (
    <Layout>
      <SEO title="Contact Us" />
      <Container gridTemplateRows="8">

        <div className="background__images">
          <img src={group12}></img>
          <img src={group121}></img>
        </div>
        <div className="form__container col-2-11 col-md-1-12 row-3">
        <h1 className="row-1 col-2-11">
        เกี่ยวกับเรา
        </h1>
        <div className="row-2 col-2-11">
        <p>Smartway System ให้บริการโอนเงินผ่านเว็บไซต์หรือแอปพลิเคชันในมือถือ จาก ประเทศออสเตรเลียไปประเทศไทย ได้ตลอด 24 ชม. ด้วยเรทที่ดีที่สุด และไม่มีค่าธรรมเนียมในการโอน</p>
        <p>
        บริษัท Smartway System Pty Ltd ใบอนุญาตจดทะเบียนบริษัทเลขที่ 611856154 จาก ASICและได้รับใบอนุญาตให้ทำธุรกรรมการโอนเงิน จาก AUSTRAC หมายเลขใบอนุญาตเลขที่ 100520069
        </p>
        <p>
        ผู้ใช้บริการของ Smartway System จึงมั่นใจได้ว่าเงินโอนของท่านจะไปถึงผู้รับปลายทางได้อย่างปลอดภัยตามมาตรฐานของประเทศออสเตรเลีย และยังสะดวก รวดเร็วเนื่องจากมีเจ้าหน้าที่คอยช่วยเหลือพร้อมให้คำแนะนำในด้านต่างๆ
        </p>
        <p>
        สำหรับระยะเวลาในการดำเนินการโอนเงินจากประเทศออสเตรเลียไปยังประเทศไทยนั้น จะใช้เวลาภายใน 1 วันทำการ ลูกค้าจะได้รับอัตราแลกเปลี่ยนที่ดีที่สุด และไม่มีค่าธรรมเนียม
        </p>
      </div>
        </div>
      </Container>
    </Layout>
  )
}
export default AboutUsPage

