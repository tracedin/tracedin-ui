import { Span } from '../api/trace/schema/GetTransactionResponse.ts'
import { Descriptions, DescriptionsProps, Modal } from 'antd'

export const openSpanAttributePopup = ({ name, data: attributes }: Span) => {
  const items: DescriptionsProps['items'] = []

  for (const key in attributes) {
    items.push({
      label: key,
      children: attributes[key]
    })
  }

  const content = <Descriptions title={`${name} 상세정보`} items={items} column={1} />

  Modal.info({
    content,
    width: 800,
    onOk() {}
  })
}
