import React, {Component} from 'react';
import {Button, Card, Input, Modal, Select, Table, Form, message, Upload, InputNumber, Image} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {Option} from "antd/es/mentions";
import {reqDepository, reqAddProduct, reqChangeDepository} from "../../api";
import {PAGE_SIZE} from "../../utils/constants";
import {category_list, store_list2, category_list2} from '../../utils/constants'


// const store_list = ['基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']
// const category_list = ['全部', '书写用品', '桌面用品', '文件管理用品', '纸质用品', '财务用品', '辅助用品']
const add_category_list = category_list2

export default class Warehousing extends Component {
    state = {
        searchAddress: store_list2[0],
        searchCate: category_list[0],
        searchName: '',
        product: [],
        showStatus: 0,
        showChange: 0,
        total: 0,
        addCate: add_category_list[0],
        productImage: '',
        onChangeDepositoryId: 0,
        onChangeDepositoryName: '',
        onChangeDepositoryStock: 0,
        changeStock: ''
    }

    showOrder = () => {
        this.setState({showStatus: 1})

    }

    hideOrder = () => {
        this.setState({showStatus: 0, showChange: 0, changeStock: ''})
    }

    showChange = () => {
        this.setState({showChange: 1})
    }

    componentWillMount() {
        this.initColumns()
    }


    componentDidMount() {
        this.getProducts(1)
    }

    getProducts = async (currentPage) => {
        const {searchAddress, searchCate, searchName} = this.state
        let result
        result = await reqDepository({currentPage, searchCate, searchAddress, searchName})
        // console.log(currentPage, searchCate, searchAddress, searchName)
        if (result.code === 200) {
            const {records, total} = result.data
            // console.log(records)
            this.setState({
                total,
                product: records
            }, console.log(this.state.product))
        }
    }

    changeDepository = (product) => {
        this.showChange()
        // console.log(product)
        const {productId, productName, stock} = product
        console.log(productId, productName, stock)
        this.setState({
            onChangeDepositoryId: productId,
            onChangeDepositoryName: productName,
            onChangeDepositoryStock: stock
        })
    }

    initColumns = () => {

        this.columns = [
            {
                width: '15%',
                title: 'product name',
                dataIndex: 'productName',
            },
            {
                width: '20%',
                title: 'category',
                dataIndex: 'category',
            },
            {
                width: '20%',
                title: 'address',
                render: () => {
                    return (
                        this.state.searchAddress
                    )
                }
            },
            {
                width: '10%',
                title: 'picture',
                dataIndex: 'imageSrc',
                render: (image) => {
                    console.log(image)
                    const imageSrc = image.split('\\')
                    const src = imageSrc[imageSrc.length - 1]
                    return (
                        image ? <Image width={100}
                                       src={'images/' + src}/> :
                            <span style={{fontWeight: 300, color: "grey"}}>暂时无图片</span>
                    )
                }
            },
            {
                width: '10%',
                title: 'unit',
                dataIndex: 'unit'
            },
            {
                title: 'stock',
                render: (product) => {
                    return (
                        <div>
                            <span style={{marginRight: 10}}>{product.stock}</span>
                            <Button onClick={() => this.changeDepository(product)}>change</Button>
                        </div>
                    )
                }
            }
        ]
        ;
    }

    changeStock = (number) => {
        this.setState({changeStock: number})
    }

    handleChangeDepository = async () => {

        Modal.confirm({
            content: 'confirm to submit your order? Please check successfully',
            okText: 'confirm',
            cancelText: 'back',
            onOk: async () => {
                const {onChangeDepositoryId, onChangeDepositoryStock, changeStock} = this.state
                if (changeStock === '') {
                    // message.error('请填写数量')
                    message.error('number cannot be null')
                    return
                }
                const depositoryId = onChangeDepositoryId
                const depositoryStock = changeStock + onChangeDepositoryStock
                if (depositoryStock < 0) {
                    // message.error('减少库存后数量不能低于0')
                    message.error('stock cannot be under 0')
                    return
                }
                // console.log(changeStock)
                console.log(depositoryId)
                const result = await reqChangeDepository(depositoryId, depositoryStock)
                if (result.code === 200) {
                    // message.success('成功修改')
                    message.success('stock change successfully!')
                    this.getProducts(1)
                } else {
                    // message.error('修改失败')
                    message.error('fail to change')
                }
                this.hideOrder()
            },
            onCancel() {
            },
        })
    }

    render() {

        const {
            searchAddress,
            showStatus,
            showDetails,
            searchCate,
            product,
            total,
            addCate,
            showChange,
            onChangeDepositoryId,
            onChangeDepositoryName,
            onChangeDepositoryStock,
            changeStock
        } = this.state

        const store = store_list2.map((item => {
            return (
                <Option value={item}>{item}</Option>
            )
        }))

        const category = category_list.map((item => {
            {
                return (
                    <Option key={item} value={item}>{item}</Option>
                )
            }
        }))

        const addCategory = add_category_list.map((item => {
            {
                return (
                    <Option key={item} value={item}>{item}</Option>
                )
            }
        }))

        const extra = (
            <Button type='primary' onClick={this.showOrder}>
                New Product
            </Button>
        )

        const normFile = (e) => {
            if (e.file.response && e.file.response.code === 200) {
                this.setState({
                    productImage: e.file.response.data.url
                })
                console.log(this.state.productImage)
            }

            if (Array.isArray(e)) {
                return e;
            }

            return e && e.fileList;
        };

        const title = (
            <span>


                <Select
                    value={searchCate}
                    style={{width: 250, margin: '0 15px'}}
                    onChange={value => this.setState({searchCate: value}, () => this.getProducts(1))}
                >
                     {category}
                </Select>
                <Select
                    value={searchAddress}
                    style={{width: 400, margin: '0 15px'}}
                    onChange={value => this.setState({searchAddress: value}, () => this.getProducts(1))}
                >
                     {store}
                </Select>
                <Input
                    placeholder='product name'
                    style={{width: 150, marginRight: '15px'}}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>search</Button>
            </span>
        )

        const NormalLoginForm = () => {
            const onFinish = async (values) => {
                this.hideOrder()
                // message.warn(22222)
                const {productName, productUnit, productCate} = values
                // const {productImage} = this.state
                const {productImage} = this.state
                console.log('productImage:' + productImage)
                const productAddress = this.state.searchAddress
                const result = await reqAddProduct(
                    productName,
                    productImage,
                    productUnit,
                    productCate,
                    productAddress
                )
                if (result.code === 200) {
                    // message.success('上传成功')
                    message.success('upload successfully')
                    this.getProducts(1)
                } else {
                    // message.warn('该物品已存在')
                    message.warn('the product exists already')
                }
                console.log(result)
            };

            return (
                <Form
                    initialValues={{
                        productCate: add_category_list[0]
                    }}
                    style={{display: 'flex', flexDirection: 'column'}}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='productName'
                        style={{width: '60%', margin: '10px auto'}}
                        rules={[
                            {
                                required: true,
                                // message: '请输入物品名称',
                                message: 'please enter the name',
                            },
                        ]}
                    >
                        <Input placeholder="product name"/>
                    </Form.Item>
                    <Form.Item style={{width: '60%', margin: '10px auto'}}
                               name='productCate'
                    >
                        <Select
                            value={addCate}
                            // style={{width: 170, margin: '0 15px'}}
                            onChange={value => this.setState({addCate: value})}
                        >
                            {addCategory}
                        </Select>

                    </Form.Item>
                    <Form.Item
                        name='productUnit'
                        style={{width: '60%', margin: '10px auto'}}
                        rules={[
                            {
                                required: true,
                                // message: '请输入物品单位',
                                message: 'please enter the unit',
                            },
                        ]}
                    >
                        <Input placeholder="单位"/>
                    </Form.Item>

                    <Form.Item
                        style={{width: '60%', margin: '10px auto'}}
                        name="productImage"
                        label="image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="image" action='http://localhost:8080/upload' listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined/>}>click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        style={{width: '60%', margin: '10px auto'}}
                    >
                        <Button type="primary" style={{width: '100%'}}
                                htmlType="submit" className="login-form-button">
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        };


        return (
            <div>
                <Card
                    extra={extra}
                    title={title}
                >
                    <Table rowKey='productId' dataSource={product} columns={this.columns} bordered loading={false}
                           pagination={{
                               current: this.pageNum,
                               total,
                               defaultPageSize: PAGE_SIZE,
                               onChange: this.getProducts
                           }}/>
                    <Modal
                        title={searchAddress}
                        visible={showStatus === 1}
                        onCancel={this.hideOrder}
                        footer={
                            [] // 设置footer为空，去掉 取消 确定默认按钮
                        }
                    >
                        {NormalLoginForm()}
                    </Modal>
                    <Modal
                        title={searchAddress}
                        visible={showChange === 1}
                        onCancel={this.hideOrder}
                        onOk={this.handleChangeDepository}
                        okText='submit'
                        cancelText='back'
                    >
                        <div style={{marginBottom: 15}}>
                            <span
                                style={{fontWeight: 800, fontSize: 18, marginRight: 20}}>{onChangeDepositoryName}</span>
                            <InputNumber value={this.state.changeStock} style={{marginRight: 20}}
                                         onChange={(e) => this.changeStock(e)}/>
                            <span style={{fontWeight: 300, color: 'grey', fontSize: 13}}>*Positive number is to add inventory, negative number is to reduce inventory</span>
                        </div>
                        <div>
                            <span style={{fontWeight: 800, fontSize: 18, marginRight: 20}}>Inventory quantity after change：<span
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500
                                }}>{onChangeDepositoryStock + changeStock}</span></span>
                        </div>
                    </Modal>
                </Card>
            </div>
        );
    }
}
