FROM public.ecr.aws/lambda/nodejs:20

# Copy requirements.txt
COPY package.json ${LAMBDA_TASK_ROOT}

# Copy function code
COPY index.js ${LAMBDA_TASK_ROOT}

RUN mkdir -p ${LAMBDA_TASK_ROOT}/letsdata_interfaces
COPY letsdata_interfaces/ ${LAMBDA_TASK_ROOT}/letsdata_interfaces/

RUN mkdir -p ${LAMBDA_TASK_ROOT}/letsdata_service
COPY letsdata_service/ ${LAMBDA_TASK_ROOT}/letsdata_service/

RUN mkdir -p ${LAMBDA_TASK_ROOT}/letsdata_utils
COPY letsdata_utils/ ${LAMBDA_TASK_ROOT}/letsdata_utils/

# Install the specified packages
RUN npm install
 
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.handler" ]