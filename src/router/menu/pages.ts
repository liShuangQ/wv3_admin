export interface PagesMenu {
    path: string,
    title:string,
    faPath:string[]
    icon?:string, //element的icon
    children?: PagesMenu[]
}
export default [
    {
        path: '/pages/home',
        faPath: [],
        title: '主页',
        icon: 'HomeFilled',
    },
    {
        path: '1',
        faPath: [],
        title: '演示',
        icon: '',
        children: [
            {
                title: '试例',
                path: '/pages/demo',
                faPath: ['1']
            }
        ]
    },
    {
        path: '2',
        faPath:'',
        title:'一级菜单',
        children: [
            {
                title:'测试1.1',
                path: '/pages/test/demo1/demo1.1',
                faPath:['2']
            },
            {
                path: '3',
                faPath:'2',
                title:'二级菜单',
                children: [
                    {
                        path: '/pages/test/demo1/demo1.1/demo1.1.1',
                        faPath:['2','3'],
                        title:'测试1.1.1',
                    },
                ]
            }
        ]
    },
    {
        title:'测试1.2',
        faPath:[],
        path: '/pages/test/demo1/demo1.2',
    }
] as PagesMenu[]