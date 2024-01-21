export interface Paging {
  PageSize:number // عايز الصفحة يبقي فيها كام
  CurrentPage:number // الصفحة الحالية الي انت فيها
  TotalPages:number // اجمالي عدد الصفحات
  TotalItems:number // اجمالي عدد البيانات
  DataReturn:any // الداتا اللي راجعة
}
