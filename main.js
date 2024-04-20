

window.onload=function(){
    const cells = document.querySelectorAll('.cell-input');

    const tbl = document.querySelector('.t431__tbody');
    const tbl_childs = tbl.children;
    
    const points = [0,1,0.5,"0","1","0.5"];
    const opoonent_point = [1,0,0.5,"1","0","0.5"];
    const newgames = [];

    // completed rounds
    const rounds = [
        // row , opponent ,color ,result
        [
            //round 12
            [0,4,0,1],
            [1,3,0,0],
            [2,7,1,0],
            [3,1,1,1],
            [4,0,1,0],
            [5,6,1,0.5],
            [6,5,0,0.5],
            [7,2,0,1],
        ],
    ]
    
    for(let round of rounds){
        for(let obj of round){
            tbl.children[obj[0]].children[obj[1]+2].children[obj[2]].firstElementChild.value = obj[3]
        }
        calculate_points();
    }

    for(let c of cells){
        if(!c.value){
            c.style.background = 'rgb(62, 102, 43)';
            c.style.borderRadius = "5px";
            c.removeAttribute("disabled");

            c.addEventListener('keydown', enter);
            newgames.push(c);
        }
    }
    function enter(e){
        // if(e.key == "Enter"){
            setTimeout(() => {
                calculate_enter(this);
                for(let c of newgames){
                    calculate_enter(c);

                }
        
                calculate_points();
                
            }, 0);
        
        // }else{
        //     return
        // };

    }

    function calculate_enter(c){
        let color = c.parentElement.className;
        let row_element = c.parentElement.parentElement.parentElement;
        let row_index;
        for(let i = 0 ; i<tbl_childs.length; i++){
            if( tbl_childs[i] == row_element){
                row_index = i;
            }
        }
        let column_square = c.parentElement.parentElement;
        let column_index;

        for(let i = 0 ; i<row_element.children.length; i++){
            if( row_element.children[i] == column_square){
                column_index = i-2;
            }
        }
        
        let opponent = tbl_childs[column_index].children[2+row_index].querySelector(`.${color == "white" ? "black" : "white"}`).firstElementChild;

        if([".","0.","5"].includes(c.value)){
            opponent.value = c.value;
        }else if(!points.includes(c.value)){
            c.value = "";
            opponent.value ="";
        }else{
            
            opponent.value = opoonent_point[points.indexOf(c.value)];

        }
    }

    function calculate_points(){
        let ranks = [];
        for(let row of tbl_childs){
            let total_point = 0;
            let point_elements = row.querySelectorAll('.cell-input');
            for(let i=0 ; i<point_elements.length-2;i++){
                let p = point_elements[i];
                if(p.value == "½" || p.value == 0.5 || p.value == "0.5"){
                    total_point += 0.5;
                }else if(p.value){
                    total_point += parseInt(p.value);
                }
            }
            //row.children[10].removeAttribute("disabled");
            row.children[10].firstElementChild.value = total_point;
            ranks.push(row.children[10].firstElementChild);
        }
        ranks.sort((a, b) => b.value - a.value);
        for(let i=0; i<ranks.length;i++){
            ranks[i].parentElement.parentElement.children[11].firstElementChild.value = i+1;
        }

    }
}