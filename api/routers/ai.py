from fastapi import APIRouter, HTTPException
from models.resume import ImproveRequest, ImproveResponse
from services.ai_service import improve_text

router = APIRouter()


@router.post("/improve", response_model=ImproveResponse)
async def improve(request: ImproveRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text field is required and cannot be empty")

    try:
        improved = improve_text(
            text=request.text,
            context=request.context or "",
            field=request.field or "bullet",
        )
        return ImproveResponse(improved=improved)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")
