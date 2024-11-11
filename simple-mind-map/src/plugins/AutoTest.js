// 自动化测试插件
class AutoTest {
  constructor({ mindMap }) {
    this.mindMap = mindMap
    this.name = 'autoTest'
    this.init()
  }

  // 初始化
  init() {
    // 添加工具栏按钮
    this.mindMap.emit('add_toolbar_btn', {
      name: this.name,
      icon: `<svg viewBox="0 0 1024 1024" width="24" height="24">
        <path d="M874.667 426.667h-85.334V341.333c0-127.999-106.667-234.666-234.666-234.666-128 0-234.667 106.667-234.667 234.666v85.334H149.333c-46.933 0-85.333 38.4-85.333 85.333v341.333c0 46.934 38.4 85.334 85.333 85.334h725.334c46.933 0 85.333-38.4 85.333-85.334V512c0-46.933-38.4-85.333-85.333-85.333z m-469.334-85.334c0-81.067 68.267-149.333 149.334-149.333s149.333 68.266 149.333 149.333v85.334H405.333v-85.334z m213.334 341.334l-128 128c-8.533 8.533-21.333 8.533-29.867 0l-64-64c-8.533-8.534-8.533-21.334 0-29.867 8.534-8.533 21.334-8.533 29.867 0l49.067 49.067 113.066-113.067c8.534-8.533 21.334-8.533 29.867 0 8.533 8.534 8.533 21.334 0 29.867z" fill="#2196F3"></path>
      </svg>`,
      title: 'AI',
      onClick: () => {
        this.onClick()
      }
    })
  }

  async onClick() {
    const activeNode = this.mindMap.renderer.activeNodeList[0]
    if (!activeNode) {
      // 使用 Vue 事件总线来显示提示
      this.mindMap.emit('show_message', {
        type: 'warning',
        content: '请先选择一个节点!'
      })
      return
    }

    const nodeData = activeNode.nodeData.data
    const text = nodeData.text || ''
    const hyperlink = nodeData.hyperlink || ''

    try {
      const response = await fetch('http://124.220.30.53:8000/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ4NzUyMzA2OTQsInN1YiI6Im9fMzIwMzUwODQ4NDQ4MDM3MzY4In0.wtkwyuFfqNKXYLUCtoA-G-_7sS6EhNnkQYy10I-STbc'
        },
        body: JSON.stringify({
          url: hyperlink,
          webhook_callback_url: null,
          navigation_goal: text,
          data_extraction_goal: "获取发布帖子的标题",
          proxy_location: "RESIDENTIAL",
          error_code_mapping: null,
          navigation_payload: {
            username: "helloxd",
            password: "V@h_DLNto_m7"
          },
          extracted_information_schema: null
        })
      })

      if (response.ok) {
        // 使用 Vue 事件总线来显示提示
        this.mindMap.emit('show_message', {
          type: 'success',
          content: '请求发送成功!'
        })
      } else {
        throw new Error('请求失败')
      }
    } catch (error) {
      // 使用 Vue 事件总线来显示提示
      this.mindMap.emit('show_message', {
        type: 'error',
        content: '请求发送失败: ' + error.message
      })
    }
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.mindMap.emit('remove_toolbar_btn', this.name)
  }

  beforePluginDestroy() {
    this.beforePluginRemove()
  }
}

AutoTest.instanceName = 'autoTest'

export default AutoTest 