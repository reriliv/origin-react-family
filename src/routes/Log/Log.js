import React, {Component} from 'react';
import style from './Log.css';
import {Row, Col, DatePicker, Input, Button, Table, message} from 'antd';
import Request from '../../utils/request';
// import moment from 'moment';
import setListKey from '../../utils/setListKey';

const {RangePicker} = DatePicker;

// const commonUrl ="http://172.16.5.35/";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === '',
    name: record.name,
  }),
};

class Loglist extends Component{

  constructor(props){
    super(props);
    this.state = {
        startDate: null,
        endDate: null,
        columns: [
          {
            title: '日期',
            dataIndex: 'create_time',
            key: '',
            className: 'create-time',
            align: 'center',
            render: (e) =>{
                return(new Date(e * 1000).toLocaleString())
            }
          },
          {
            title: '操作者',
            dataIndex: 'user_name',
            key: 'user_name',
            className: 'user-name',
            align: 'center'
          },
          {
            title: '操作内容',
            dataIndex: 'operation',
            key: 'operation',
            className: 'operation',
            align: 'center'
          }
        ]
    }
  }

  componentDidMount(){
// <<<<<<< HEAD
    const PATH = "/api/log/lists";
    const request = new Request();
    const token = sessionStorage.getItem('token');
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify({}));
    request.fetch()
    .then(res => {
      console.info(res);
      if(res.data.code === 200){
        this.setState({
          logList: setListKey(res.data.data.data),
          total: res.data.data.total,
          pagesize: res.data.data.page_num,
          current: res.data.data.page,
        });
      }else if(res.data.code === 401){
        message.warning(res.data.info)
        window.location.href = '/login'
      }
    })
    .catch(err => {
      console.error(err)
    });
/*=======
            const url = commonUrl+"api/log/lists";
            const request = new Request();
            const token = sessionStorage.getItem('token');
            request.setURL(url);
            request.setOPTIONS('POST', token, JSON.stringify({}));
            request.fetch()
            .then(res => {
                console.info(res)
                if(res.data.code === 200){
                      this.setState({
                        logList:res.data.data.data,
                        total: res.data.data.total,
                        pagesize: res.data.data.page_num,
                        current: res.data.data.page,
                    })
                }else if(res.data.code === 401){
                     message.warning(res.data.info)
                     window.location.href = '/login'
                }else{
                    message.warning(res.data.info)
                }
            })
            .catch(err => {
                console.error(err)
            })
>>>>>>> f628d2449842c29fcaaa65cb901eb87c14c56ce9*/
  }

  render(){

    return (
      <div>
        <h4 style={{fontSize: 18}}>日志详情</h4>
        <Row className={style['row']}>
{/*<<<<<<< HEAD
          <Col span={12}>
            <span className={style['lf-text']}>查询时间：</span>
            <DatePicker
              showtime={{defaultValue: moment('00:00:00','HH:mm:ss')}}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['开始时间']}
              onChange={this.disabledStartDate}
              onOk={this.handleOk}
            />
            <span className={style['mid-text']}>至</span>
            <DatePicker
              showtime={{defaultValue: moment('00:00:00','HH:mm:ss')}}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['结束时间']}
              onChange={this.handleChange}
              onOk={this.handleOk}
            />
            <span className={style['rg-text']}>近30天</span>
          </Col>
          <Col span={12}>
            <span className={style['lf-text']}>用户：</span>
            <Input className={style['user-inp']}/>
            <Button className={style['ensure']} type="primary">确定</Button>
            <Button className={style['cancel']}>取消</Button>
          </Col>
        </Row>
        <Table
          className={style['log-list']}
          rowSelection={rowSelection}
          dataSource={this.state.logList}
          columns={this.state.columns}
          size="middle"
          bordered
        />
=======*/}
            <Col span={12}>
                  <span className={style['lf-text']}>查询时间：</span>
                  <RangePicker format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }}></RangePicker>
                  <span className={style['rg-text']}>近30天</span>
            </Col>
            <Col span={12}>
                  <span className={style['lf-text']}>操作人姓名：</span>
                  <Input className={style['user-inp']}/>
                  <Button className={style['ensure']} type="primary">搜索</Button>
            </Col>
      </Row>
      <Table className={style['log-list']}  rowSelection={rowSelection} dataSource={this.state.logList} columns={this.state.columns} size="middle" bordered/>

{/*>>>>>>> f628d2449842c29fcaaa65cb901eb87c14c56ce9*/}
      </div>
    );

  }

}

export default Loglist;