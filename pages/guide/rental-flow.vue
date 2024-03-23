<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="レンタル全般 レンタルの手順（詳細版）" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner d-lg-flex py-16 guide__line-height">

      <!-- サイドメニューコンポーネント -->
      <Guideline-lists></Guideline-lists>
      <main class="content ml-lg-10 letter-space-01em font-weight-medium">
        <div class="pb-md-3 mb-5">
          <h4 class="d-flex align-center text-gray letter-space-01em text-h6 text-md-h4 font-weight-medium">
            <div class="square font-italic bold text-white mr-5">
              <p class="title-no">{{ menuIndex + 1 }}</p>
            </div>
            {{ getTitle[menuIndex].title }}
          </h4>
          <div class="d-flex text-gray text-h6 font-weight-medium mt-2 mt-md-3 ml-11 ml-md-14 pl-8">
            <span class="guide__title__decoration mr-3"></span>
            <p class="mt-2">レンタルの手順（詳細版）</p>
          </div>
        </div>
        
        <v-row class="guide__flow-section mb-10">
          <v-col cols="12" md="6">
            <v-btn v-scroll-to="'#member'" class="guide__flow-section__btn pt-8 pb-7 white--text letter-space-01em font-weight-medium" color="accent">
              <span>WEB会員の場合</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn v-scroll-to="'#nonmember'" class="guide__flow-section__btn pt-8 pb-7 white--text letter-space-01em font-weight-medium" color="primary">
              <span>WEB非会員の場合</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <!-- WEB会員の場合 -->
        <guideline-rental-section section-title="WEB会員の場合" section-id="member">

          <guideline-rental-section-inner guideline-rental-id="flow-member-1" member-type="member" guideline-rental-title="WEB会員登録">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              レンタルの注文を行う場合、身分証明などでの本人確認手続きが必要となります。本人確認登録が未実施の場合はレンタルの注文申し込みができませんので、あらかじめ本人確認の手続きをお済ませください。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_web_member_register.png" 
              guideline-alt="Web会員登録のイメージ"
              attr-width="900" 
              attr-height="752"
            ></guideline-image>
            <v-row class="mt-10">
              <v-col cols="12">
                <guideline-btn
                  :link-text="btnList[10].text"
                  :link-url="btnList[10].url">
                </guideline-btn>
              </v-col>
            </v-row>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-2" member-type="member" guideline-rental-title="カート機能でレンタル仮申し込み">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              レンタルカタログのカート機能を利用し、商品を追加してください。
              レンタル利用に関する必要事項を記入し送信をお願いします。
            </p>
            <guideline-footnote
                :note-list="{
                  type: 'bold-note',
                  items: ['この時点では注文確定しておりません。在庫状況などを確認いたします。']
                }"
                class="mt-6"
              ></guideline-footnote>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_cart.png" 
              guideline-alt="カートのイメージ"
              attr-width="900" 
              attr-height="664"
            ></guideline-image>
            <guideline-image
              guideline-img="/img/guide/rental_flow/flow_cart_order_confirm.png" 
              guideline-alt="レンタル申し込み完了のイメージ"
              attr-width="900" 
              attr-height="627"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-3" member-type="staff-member--section" guideline-rental-title="お見積回答">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              お申し込みいただいた内容にて、レンタルのお見積りと在庫状況の確認結果をお知らせします。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_quotation_answer.png" 
              guideline-alt="お見積回答のイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-4" member-type="member" guideline-rental-title="お見積り確認・ご注文">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              弊社からの見積もりを確認し、ご注文いただける場合はマイページより手続きをお願いします。
            </p>
            <p class="mt-3 text-body-2 text-sm-body-1 font-weight-medium">
              マイページ→注文履歴→該当する注文の詳細画面→注文を進める
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_order.png" 
              guideline-alt="お見積り確認・ご注文のイメージ"
              attr-width="900" 
              attr-height="558"
            ></guideline-image>
            <guideline-footnote
                :note-list="{
                  type: 'bold-note',
                  items: [
                    'お見積りの有効期限内に回答が無い場合、レンタル商品の予約が無効になる場合があります。ご注意ください。'
                  ]
                }"
                class="mt-6"
              ></guideline-footnote>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-5" member-type="staff-member--section" guideline-rental-title="注文確定（機材確保完了）">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              お客様からのお見積り承認の回答を受け、レンタル注文（予約）を確定いたします。注文確定についてお客様にお知らせし、注文手続きは完了となります。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_confirm.png" 
              guideline-alt="注文確定（機材確保完了）のイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-6" member-type="member" guideline-rental-title="お支払い">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              支払いは事前振込みのみとなります。機材引き渡し日より5営業日前までに指定の銀行口座にレンタル費用をお振込みください。
            </p>
            <v-row class="mt-3">
              <v-col cols="12">
                <guideline-btn
                  :link-text="btnList[6].text"
                  :link-url="btnList[6].url">
                </guideline-btn>
              </v-col>
            </v-row>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_payment.png" 
              guideline-alt="お支払いのイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-7" member-type="staff-member--section" guideline-rental-title="レンタル商品の準備">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              お支払い確認後、レンタル商品（機材）の準備及び、事前チェックを行います。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/frow_preparation.png" 
              guideline-alt="注文確定（機材確保完了）のイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-8" member-type="staff-member" guideline-rental-title="レンタル商品のお引渡し/お受け取り">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご指定いただいた日程でレンタル商品（機材）をお引渡しします。引き渡し方法は下記の3つよりご指定ください。
            </p>
            <v-simple-table class="guide-table guide__flow-table guide-table--default transparent mt-7">
              <template #default>
                <thead class="text-md-body-1">
                  <tr>
                    <th class="headingText--text text-center text-md-body-2 font-weight-bold">引き渡し方法</th>
                    <th class="headingText--text text-center text-md-body-2 font-weight-bold">詳細</th>
                  </tr>
                </thead>
                <tbody class="headingText--text text-center">
                  <tr>
                    <td class="guide-table__td text-md-body-1">直接来社</td>
                    <td class="guide-table__td text-md-body-1 text-left">弊社各拠点にて営業時間内にお渡し</td>
                  </tr>
                  <tr>
                    <td class="guide-table__td text-md-body-1">宅配便（郵送）</td>
                    <td class="guide-table__td text-md-body-1 text-left">指定日・指定場所に弊社から着払いで発送</td>
                  </tr>
                  <tr>
                    <td class="guide-table__td text-md-body-1">チャーター便</td>
                    <td class="guide-table__td text-md-body-1 text-left">弊社スタッフまたは配送業者より、搬入希望日時・指定場所に発送（別途料金）</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_delivery.png" 
              guideline-alt="レンタル商品のお引渡し/お受け取り"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-9" member-type="member" guideline-rental-title="レンタル商品のご利用">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご指定の期間にてレンタル商品（機材）をご利用ください。商品は精密機器になります。お取扱いには十分ご注意をお願いいたします。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_use.png" 
              guideline-alt="レンタル商品のご利用のイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-10" member-type="member-staff" guideline-rental-title="レンタル商品の返却">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご指定いただいた日程でレンタル商品（機材）をご返却ください。ご返却方法は下記の3つよりご指定ください。
            </p>
            <v-simple-table class="guide-table guide__flow-table guide-table--default transparent mt-7">
              <template #default>
                <thead class="text-md-body-1">
                  <tr>
                    <th class="headingText--text text-center text-md-body-2 font-weight-bold">返却方法</th>
                    <th class="headingText--text text-center text-md-body-2 font-weight-bold">詳細</th>
                  </tr>
                </thead>
                <tbody class="headingText--text text-center">
                  <tr>
                    <td class="guide-table__td text-md-body-1">直接来社</td>
                    <td class="guide-table__td text-md-body-1 text-left">弊社各拠点にて営業時間内に返却</td>
                  </tr>
                  <tr>
                    <td class="guide-table__td text-md-body-1">宅配便（郵送）</td>
                    <td class="guide-table__td text-md-body-1 text-left">お客様手配で弊社拠点へ発払いで発送</td>
                  </tr>
                  <tr>
                    <td class="guide-table__td text-md-body-1">チャーター便</td>
                    <td class="guide-table__td text-md-body-1 text-left">弊社スタッフまたは配送業者より、指定場所で引き取りいたします。（別途料金）</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <guideline-image
              guideline-img="/img/guide/rental_flow/flow_return.png" 
              guideline-alt="レンタル商品の返却のイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-member-11" member-type="staff-member--section" guideline-rental-title="返却商品の確認">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              弊社にて返却品のチェックをおこない、問題なければ取引終了です。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_confirmation.png"   
              guideline-alt="返却商品の確認のイメージ"
              attr-width="900" 
              attr-height="300"
            ></guideline-image>
          </guideline-rental-section-inner>

        </guideline-rental-section>


        <!-- WEB非会員の場合 -->
        <guideline-rental-section section-title="WEB非会員の場合" section-id="nonmember">

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-1" member-type="nonmember" guideline-rental-title="レンタルの仮申し込み">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご希望の機材や内容をお問合せフォームまたは電話にてご連絡ください。お急ぎの場合は、各拠点へお電話ください。
            </p>
            <v-row class="mt-3">
              <v-col cols="12" md="6">
                <guideline-btn
                  :link-text="btnList[9].text"
                  :link-url="btnList[9].url">
                </guideline-btn>
              </v-col>
              <v-col cols="12" md="6">
                <guideline-btn
                  :link-text="btnList[2].text"
                  :link-url="btnList[2].url">
                </guideline-btn>
              </v-col>
            </v-row>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/frow_request_pc.png" 
              guideline-alt="パソコンでレンタルの仮申し込みのイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/frow_request_tell.png" 
              guideline-alt="電話でレンタルの仮申し込みのイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-2"  member-type="staff-nonmember--section" guideline-rental-title="お見積り回答">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              お申し込みいただいた内容にて、レンタルのお見積りと在庫状況の確認結果をお知らせします。
            </p>
            <guideline-footnote
              :note-list="{
                type: 'bold-note',
                items: [
                  'お問合せ内容によっては、回答までにお時間を頂く場合もございます。'
                ]
              }"
              class="mt-6 color__C8E8E2"
            ></guideline-footnote>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_quotation_answer.png"  
              guideline-alt="お見積り回答のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-3"  member-type="nonmember" guideline-rental-title="お見積り確認・ご注文">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              弊社からの見積もりを確認し、ご注文いただける場合はその旨を回答お願いします。
            </p>
            <guideline-footnote
              :note-list="{
                type: 'bold-note',
                items: [
                  'お見積りの有効期限内に回答が無い場合、レンタル商品の予約が無効になる場合があります。ご注意ください。'
                ]
              }"
              class="mt-6"
            ></guideline-footnote>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/frow_check.png" 
              guideline-alt="お見積り確認・ご注文のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-4"  member-type="nonmember" guideline-rental-title="お客様登録（※初めてのご利用の場合）">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              初めてご利用の場合、お客様登録が必要になります。（登録無料）
            </p>
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              下記フォームよりお手続き・書類提出をお願いしております。
            </p>
            <v-row class="mt-3">
              <v-col cols="12" md="6">
                <guideline-btn
                  :link-text="btnList[11].text"
                  :link-url="btnList[11].url">
                </guideline-btn>
              </v-col>
              <v-col cols="12" md="6">
                <guideline-btn
                  :link-text="btnList[12].text"
                  :link-url="btnList[12].url">
                </guideline-btn>
              </v-col>
            </v-row>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_certificate.png" 
              guideline-alt="お客様登録（※初めてのご利用の場合）のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-5"  member-type="staff-nonmember--section" guideline-rental-title="注文確定（機材確保完了）">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              お客様からのお見積り承認の回答を受け、レンタル注文（予約）を確定いたします。注文確定についてお客様にお知らせし、注文手続きは完了となります。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_confirm.png" 
              guideline-alt="注文確定（機材確保完了）のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-6"  member-type="nonmember" guideline-rental-title="お支払い">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              支払いは事前振込みのみとなります。機材引き渡し日より5営業日前までに指定の銀行口座にレンタル費用をお振込みください。
            </p>
            <v-row class="mt-3">
              <v-col cols="12">
                <guideline-btn
                  :link-text="btnList[6].text"
                  :link-url="btnList[6].url">
                </guideline-btn>
              </v-col>
            </v-row>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_payment.png" 
              guideline-alt="お支払いのイメージ"
              attr-width="900" 
              attr-height="300" 
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-7"  member-type="staff-nonmember--section" guideline-rental-title="レンタル商品の準備">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              お支払い確認後、レンタル商品（機材）の準備及び、事前チェックを行います。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/frow_preparation.png" 
              guideline-alt="レンタル商品の準備のイメージ"
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
              ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-8"  member-type="staff-member" guideline-rental-title="レンタル商品のお引渡し/お受け取り">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご指定いただいた日程でレンタル商品（機材）をお引渡しします。引き渡し方法は下記の3つよりご指定ください。
            </p>
            <v-simple-table class="guide-table guide__flow-table guide-table--default transparent mt-7">
                <template #default>
                  <thead class="text-md-body-1">
                    <tr>
                      <th class="headingText--text text-center text-md-body-2 font-weight-bold">引き渡し方法</th>
                      <th class="headingText--text text-center text-md-body-2 font-weight-bold">詳細</th>
                    </tr>
                  </thead>
                  <tbody class="headingText--text text-center">
                    <tr>
                      <td class="guide-table__td text-md-body-1">直接来社</td>
                      <td class="guide-table__td text-md-body-1 text-left">弊社各拠点にて営業時間内にお渡し</td>
                    </tr>
                    <tr>
                      <td class="guide-table__td text-md-body-1">宅配便（郵送）</td>
                      <td class="guide-table__td text-md-body-1 text-left">指定日・指定場所に弊社から着払いで発送</td>
                    </tr>
                    <tr>
                      <td class="guide-table__td text-md-body-1">チャーター便</td>
                      <td class="guide-table__td text-md-body-1 text-left">弊社スタッフまたは配送業者より、搬入希望日時・指定場所に発送（別途料金）</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_delivery.png" 
              guideline-alt="レンタル商品のお引渡し/お受け取りのイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-9"  member-type="nonmember" guideline-rental-title="レンタル商品のご利用">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご指定の期間にてレンタル商品（機材）をご利用ください。商品は精密機器になります。お取扱いには十分ご注意をお願いいたします。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_use.png" 
              guideline-alt="レンタル商品のご利用のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-10"  member-type="member-staff" guideline-rental-title="レンタル商品の返却">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              ご指定いただいた日程でレンタル商品（機材）をご返却ください。ご返却方法は下記の3つよりご指定ください。
            </p>
            <v-simple-table class="guide-table guide__flow-table guide-table--default transparent mt-7">
                <template #default>
                  <thead class="text-sm-body-1">
                    <tr>
                      <th class="headingText--text text-center text-md-body-2 font-weight-bold">返却方法</th>
                      <th class="headingText--text text-center text-md-body-2 font-weight-bold">詳細</th>
                    </tr>
                  </thead>
                  <tbody class="headingText--text text-center">
                    <tr>
                      <td class="guide-table__td text-md-body-1">直接来社</td>
                      <td class="guide-table__td text-md-body-1 text-left">弊社各拠点にて営業時間内に返却</td>
                    </tr>
                    <tr>
                      <td class="guide-table__td text-md-body-1">宅配便（郵送）</td>
                      <td class="guide-table__td text-md-body-1 text-left">お客様手配で弊社拠点へ発払いで発送</td>
                    </tr>
                    <tr>
                      <td class="guide-table__td text-md-body-1">チャーター便</td>
                      <td class="guide-table__td text-md-body-1 text-left">弊社スタッフまたは配送業者より、指定場所で引き取りいたします。（別途料金）</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_return.png" 
              guideline-alt="レンタル商品の返却のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

          <div class="d-flex justify-center mt-7 mb-4">
            <div class="arrow-down"></div>
          </div>

          <guideline-rental-section-inner guideline-rental-id="flow-nonmember-11" member-type="staff-nonmember--section" guideline-rental-title="返却商品の確認">
            <p class="text-body-2 text-sm-body-1 font-weight-medium">
              弊社にて返却品のチェックをおこない、問題なければ取引終了です。
            </p>
            <guideline-image 
              guideline-img="/img/guide/rental_flow/flow_confirmation.png" 
              guideline-alt="返却商品の確認のイメージ" 
              attr-width="900" 
              attr-height="300"
              nonmember-flg="true"
            ></guideline-image>
          </guideline-rental-section-inner>

        </guideline-rental-section>

        <div class="guide__transition">
          <v-row class="d-flex d-flex justify-start">
            <v-col cols="12" md="6">
              <v-row class="guide__transition__left">
                <v-col cols="1" class="d-flex justify-end justify-md-start align-center pa-0">
                  <a href="/guide/rental">
                    <v-icon color="primary" x-large>mdi-chevron-left</v-icon>
                  </a>
                </v-col>
                <v-col cols="9" md="11" class="px-0 pr-md-2 px-lg-2">
                  <v-btn href="/guide/rental" class="d-flex justify-center guide__transition__btn bg-white text-caption text-sm-body-2" color="primary" elevation="0" outlined x-large>
                    <span class="lh-crop-12 font-weight-medium">レンタルご利用ガイド/レンタル全般</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>

      </main>

    </div>

  </section>
</template>
<script>
import items from '@/assets/json/guideline.json'
import links from '@/assets/json/guidelineLink.json'
export default {
  data() {
    return {
      menuList: items,
      btnList: links,
      breadCrumbs: [],
      transitionBtnList: [
        {
          backBtnName:'',
          backBtnUrl: '',
        },
        {
          nextBtnName:'',
          nextBtnUrl: '',
        },
      ] 
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "レンタルご利用ガイド",
      meta: [
        { hid: 'description', name: 'description', content: 'レンタルご利用ガイド - レンタル全般 レンタルの手順（詳細版） - | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  computed: {
    menuIndex() {
      return Object.keys(this.menuList).indexOf("rental")
    },
    getTitle() {
      return Object.values(this.menuList)
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'レンタルご利用ガイド - レンタル全般 -', path: '/guide/rental-flow' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';

.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}
.top__inner {
  width: 100% !important;
  max-width: 800px !important;
  padding: 0 5%;
  position: relative;
}

.color {
  &__primary {
    color: $primary !important;
  }
  &__accent {
    color: $accent !important;
  }
  &__C8E8E2 {
    color: #C8E8E2;
  }
}

::v-deep {
  .color__C8E8E2 {
    & li {
      color: #C8E8E2 !important;
      &::before {
        color: #C8E8E2 !important;
      }
    }
  }
  .guide {
    &__flow {
      &-section__btn {
        & span.v-btn__content {
          flex-direction: column;
        }
      }
    }
  }
}

.square{
  position: relative;
  width: 60px;
  padding-top: 60px;
  background: $accent;
  @include mq(md) {
    width: 50px;
    padding-top: 50px;
  }
}
.title-no{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
}

.guide{
  &__line-height p {
    line-height: 1.8em!important;
  }
  &__img {
    width: 100%;
    max-width: 550px;
    border: 2px solid $accent;
    border-radius: 10px;
    &__nonmember{
      border: 2px solid $primary;
    }
    @include mq(md){
      max-width: 550px;
    }
    @include mq(sm){
      max-width: 700px;
    }
    &__figureFlg {
      width: 100%;
    }
  }
}

.guide {
  &__title {
    &__decoration {
      display: block;
      height: 25px;
      width: 25px;
      border-left: 3px solid $primary;
      border-bottom: 3px solid $primary;
    }
  }
  &__flow {
    &-section {
      max-width: 700px;
      margin: auto;
      &__btn {
        width: 100%;
      }
    }
    &-table {
      th {
        &:first-child {
          width: 30%;
        }
      }
    }
  }
  &__transition {
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;
    &__btn{
      width: 100%;
    }
    &__left {
      justify-content: start;
      @include mq(xsm){
        justify-content: center;
      }
    }
    &__light {
      justify-content: end;
      @include mq(xsm){
        justify-content: center;
      }
    }
  }
}

.arrow-down {
  position: relative;
  width: 0;
  height: 45px; /* 線の長さを調整 */
  border-left: 2px dashed #4b5654; /* 左側の境界 */
}
.arrow-down::after {
  content: "";
  position: absolute;
  top: 38px; /* 矢印の位置を線の末端に合わせる */
  left: -7px;
  border: solid #4b5654;
  border-width: 0 2px 2px 0; /* 矢印のサイズを調整 */
  padding: 4.9px;
  transform: rotate(45deg); /* 矢印を下向きに */
  -webkit-transform: rotate(45deg); /* Safari用 */
}
</style>
