function bestCharge(selectedItems) {
	// 输入订单id*count列表
	
	var total=0;
	let itemsAddCount=getItemsAddCount(selectedItems,total);
	let result=getString(itemsAddCount,total);
	
	
  return result;
}
/**
*为item对象添加count、sum属性,同时计算出总价total(如果单独拆分成一任务，多一次循环)
*
*/
function getItemsAddCount(selectedItems,total){
	// 返回一个数组
	let items=loadAllItems();
	let itemsAddCount=[];
	for(let i=0;i<selectedItems.length;i++){
		let itemId =selectedItems[i].substr(0,8);
		var count = selectedItems[i].substr(11,12);
		for(let j=0;j<items.length;j++){
			if(itemId==items[j].id){
				itemsAddCount.push({
					id:items[j].id,
					name: items[j].name,
					price: items[j].price,
					count: count,
					sum:count*items[j].price
				});
				total =total+count*items[j].price;
			}
			break;
		}
	}
	return itemsAddCount;
}

function getbestCharge(itemsAddCount,total){
	let first=total;
	let second=total;
	let result="";
	let secondCharge=0;
	var promotions=loadPromotions()[1];
	if(total>30){
		first=total-6;
	}
	for(let i=0;i<itemsAddCount.length;i++){
		let item = itemsAddCount[i];
		for(let j=0;j<promotions.length;j++){
			if(item.id==promotions[j]){
				secondCharge=secondCharge+item.sum/2;
				break;
			}
			
		}
	}
	second=total-secondCharge;
	if(first==total&&second==total){
		return result;
	}
	if(first<=second){
		result=result+"使用优惠:\n指定菜品半价(黄焖鸡，凉皮)，省"+(total-first)+"元\n";

	}else{
		result=result+"使用优惠:\n满30减6元，省6元\n";
	}
	return result;
}
function getString(itemsAddCount,total){
	let result="";
	result=result+"============= 订餐明细 =============\n";
	for(let i=0;i<itemsAddCount.length;i++){
		let oneItem =itemsAddCount[i];
		result=result+oneItem.name+" x "+oneItem.count+" = "+oneItem.sum+"元\n";
	}
	
	result=result+"-----------------------------------\n";
	result=result+getbestCharge(itemsAddCount,total);
	result=result+"-----------------------------------\n";
	result=result+"总计："+total+"元\n"；
	result=result+"===================================";
	return result;
}
