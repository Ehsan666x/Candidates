window.onload=function(){
    const cells = document.querySelectorAll('.cell-input');
    const table = document.querySelector('.t431__tbody');
    const table_childs = table.children;
    
    const points = [0,1,0.5,"0","1","0.5"];
    const opoonent_point = [1,0,0.5,"1","0","0.5"];
    const newgames = [];

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
        for(let i = 0 ; i<table_childs.length; i++){
            if( table_childs[i] == row_element){
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
        
        let opponent = table_childs[column_index].children[2+row_index].querySelector(`.${color == "white" ? "black" : "white"}`).firstElementChild;

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
        for(let row of table_childs){
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