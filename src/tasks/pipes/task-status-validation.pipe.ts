import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
   readonly allowedStatuses=[
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
   ]
   
    transform(value: any) {
        value=value.toLocaleUpperCase()
        if(!this.isStatusValid(value)){
            throw new BadRequestException('this is not a valid status')
        }
           
        return value        
    }

    private isStatusValid(status:any){
        let inx=this.allowedStatuses.indexOf(status)
        return inx!==-1

    }
}